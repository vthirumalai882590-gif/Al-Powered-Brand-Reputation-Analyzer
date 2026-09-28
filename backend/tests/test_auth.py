from app.security.auth import get_password_hash, verify_password, create_access_token, decode_access_token

def test_password_hashing():
    raw_pass = "secure_password_123"
    hashed = get_password_hash(raw_pass)
    assert verify_password(raw_pass, hashed) is True
    assert verify_password("wrong_password", hashed) is False

def test_jwt_token_encoding_decoding():
    data = {"sub": "usr_test_001", "role": "customer"}
    token = create_access_token(data)
    decoded = decode_access_token(token)
    assert decoded["sub"] == "usr_test_001"
    assert decoded["role"] == "customer"
