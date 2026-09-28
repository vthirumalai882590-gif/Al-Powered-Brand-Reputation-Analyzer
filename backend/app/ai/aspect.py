import re
from typing import Dict, Any, List, Tuple
from app.ai.category_aspects import get_aspect_taxonomy

# Polarity lexicon for aspect clauses
POSITIVE_MODIFIERS = {
    "great": 0.8, "excellent": 0.9, "amazing": 0.9, "superb": 0.9, "love": 0.85,
    "good": 0.6, "best": 0.95, "fast": 0.7, "powerful": 0.85, "smooth": 0.75,
    "sturdy": 0.8, "durable": 0.8, "solid": 0.75, "quiet": 0.8, "silent": 0.85,
    "easy": 0.7, "fine": 0.6, "nice": 0.6, "effective": 0.8, "soft": 0.7,
    "shiny": 0.7, "light": 0.6, "awesome": 0.9, "worth": 0.8, "top": 0.8,
    "clean": 0.7, "accha": 0.7, "mast": 0.85, "badiya": 0.85, "shandar": 0.9,
    "sahi": 0.65, "paisa vasool": 0.95, "satisfactory": 0.6
}

NEGATIVE_MODIFIERS = {
    "bad": -0.7, "poor": -0.8, "terrible": -0.9, "horrible": -0.95, "worst": -1.0,
    "slow": -0.6, "weak": -0.75, "noisy": -0.8, "loud": -0.7, "leak": -0.85,
    "leaking": -0.85, "leakage": -0.85, "heating": -0.75, "overheating": -0.9,
    "hot": -0.65, "burning": -0.95, "smell": -0.6, "broken": -0.9, "damage": -0.85,
    "damaged": -0.85, "defective": -0.9, "useless": -0.9, "waste": -0.9,
    "cheap": -0.65, "flimsy": -0.8, "loose": -0.6, "tight": -0.6, "heavy": -0.5,
    "sticky": -0.7, "greasy": -0.7, "fall": -0.7, "loss": -0.7, "rough": -0.6,
    "kharab": -0.85, "bakwas": -0.95, "bekar": -0.85, "ghatiya": -0.95, "dhoka": -0.95
}

NEGATION_TERMS = {"not", "no", "never", "hardly", "barely", "scarcely", "without", "nahi", "mat"}

def _split_into_clauses(text: str) -> List[str]:
    """
    Split review text into semantic clauses using punctuation and conjunctions.
    """
    # Split on periods, exclamation marks, commas, semicolons, and conjunctions
    pattern = r'[.!?;,\n]|(?:\s+(?:but|however|although|though|whereas|and|or|yet|lekin|magar|par)\s+)'
    raw_clauses = re.split(pattern, text, flags=re.IGNORECASE)
    return [c.strip() for c in raw_clauses if len(c.strip()) > 2]

def extract_aspect_sentiments(text: str, category: str = "", overall_rating: float = 3.0) -> Dict[str, Dict[str, Any]]:
    """
    Extracts category-specific aspects from text, determines aspect-level sentiment,
    computes aspect scores (-1.0 to 1.0), and attaches relevant text snippets.
    """
    if not text or not text.strip():
        return {}

    taxonomy = get_aspect_taxonomy(category)
    clauses = _split_into_clauses(text)
    
    aspect_findings: Dict[str, List[Tuple[float, str]]] = {aspect: [] for aspect in taxonomy}
    
    for clause in clauses:
        clause_lower = clause.lower()
        words = re.findall(r'\b[a-zA-Z0-9_\'-]+\b', clause_lower)
        
        # Check which aspects this clause discusses
        clause_aspects = []
        for aspect_name, keywords in taxonomy.items():
            for kw in keywords:
                # Word boundary match
                if re.search(r'\b' + re.escape(kw) + r'\b', clause_lower):
                    clause_aspects.append(aspect_name)
                    break
        
        if not clause_aspects:
            continue
            
        # Determine polarity of this clause
        clause_score = 0.0
        polarity_hits = 0
        has_negation = any(neg in words for neg in NEGATION_TERMS)
        
        for w in words:
            if w in POSITIVE_MODIFIERS:
                score = POSITIVE_MODIFIERS[w]
                if has_negation:
                    score = -score * 0.85
                clause_score += score
                polarity_hits += 1
            elif w in NEGATIVE_MODIFIERS:
                score = NEGATIVE_MODIFIERS[w]
                if has_negation:
                    # e.g. "not noisy" -> positive
                    score = abs(score) * 0.75
                clause_score += score
                polarity_hits += 1
                
        # If no explicit polarity words in clause, infer from overall star rating
        if polarity_hits == 0:
            if overall_rating >= 4.0:
                clause_score = 0.5
            elif overall_rating <= 2.0:
                clause_score = -0.5
            else:
                clause_score = 0.0
        else:
            clause_score = clause_score / polarity_hits
            
        # Bound score to [-1.0, 1.0]
        clause_score = max(-1.0, min(1.0, clause_score))
        
        for asp in clause_aspects:
            aspect_findings[asp].append((clause_score, clause))
            
    # Compile final aspect summary
    results: Dict[str, Dict[str, Any]] = {}
    for aspect_name, mentions in aspect_findings.items():
        if not mentions:
            continue
            
        avg_score = sum(s for s, _ in mentions) / len(mentions)
        snippets = list(set([snip for _, snip in mentions]))[:3]
        
        if avg_score > 0.15:
            sentiment = "positive"
        elif avg_score < -0.15:
            sentiment = "negative"
        else:
            sentiment = "neutral"
            
        # Confidence increases with mention count and strong polarity
        confidence = min(0.98, 0.75 + (len(mentions) * 0.06) + (abs(avg_score) * 0.15))
        
        results[aspect_name] = {
            "sentiment": sentiment,
            "score": round(avg_score, 2),
            "confidence": round(confidence, 2),
            "mentions": len(mentions),
            "snippets": snippets
        }
        
    return results
