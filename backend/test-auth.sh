#!/bin/bash

# Test Proyecto Margarita Authentication Endpoints

BASE_URL="http://localhost:3000/api/auth"
TEST_EMAIL="test.user@ejemplo.com"
TEST_PASSWORD="TestPass123"
TEST_NICKNAME="TestUser"

echo "=========================================="
echo "Testing Proyecto Margarita Auth Endpoints"
echo "=========================================="
echo ""

# Test 1: Signup
echo "📝 TEST 1: Signup (POST /api/auth/signup)"
echo "Payload: email=$TEST_EMAIL, password=$TEST_PASSWORD, nickname=$TEST_NICKNAME"
SIGNUP_RESPONSE=$(curl -s -X POST "$BASE_URL/signup" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\",
    \"nickname\": \"$TEST_NICKNAME\"
  }")

echo "Response:"
echo "$SIGNUP_RESPONSE" | jq '.' 2>/dev/null || echo "$SIGNUP_RESPONSE"
echo ""

# Extract tokens from signup
ACCESS_TOKEN=$(echo "$SIGNUP_RESPONSE" | jq -r '.data.accessToken' 2>/dev/null)
REFRESH_TOKEN=$(echo "$SIGNUP_RESPONSE" | jq -r '.data.refreshToken' 2>/dev/null)

if [ "$ACCESS_TOKEN" == "null" ] || [ -z "$ACCESS_TOKEN" ]; then
  echo "⚠️  Signup may have failed or user already exists. Attempting login..."
  
  # Test 2: Login
  echo ""
  echo "🔐 TEST 2: Login (POST /api/auth/login)"
  echo "Payload: email=$TEST_EMAIL, password=$TEST_PASSWORD"
  LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
    -H "Content-Type: application/json" \
    -d "{
      \"email\": \"$TEST_EMAIL\",
      \"password\": \"$TEST_PASSWORD\"
    }")
  
  echo "Response:"
  echo "$LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGIN_RESPONSE"
  echo ""
  
  ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.accessToken' 2>/dev/null)
  REFRESH_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.refreshToken' 2>/dev/null)
else
  echo "✅ Signup successful!"
fi

echo ""
echo "Extracted Tokens:"
echo "ACCESS_TOKEN: ${ACCESS_TOKEN:0:20}..."
echo "REFRESH_TOKEN: ${REFRESH_TOKEN:0:20}..."
echo ""

# Test 3: Get Current User
if [ ! -z "$ACCESS_TOKEN" ] && [ "$ACCESS_TOKEN" != "null" ]; then
  echo "👤 TEST 3: Get Current User (GET /api/auth/me)"
  echo "Header: Authorization: Bearer $ACCESS_TOKEN"
  ME_RESPONSE=$(curl -s -X GET "$BASE_URL/me" \
    -H "Authorization: Bearer $ACCESS_TOKEN")
  
  echo "Response:"
  echo "$ME_RESPONSE" | jq '.' 2>/dev/null || echo "$ME_RESPONSE"
  echo ""
  
  # Test 4: Refresh Token
  echo "🔄 TEST 4: Refresh Token (POST /api/auth/refresh)"
  echo "Payload: refreshToken=$REFRESH_TOKEN"
  REFRESH_RESPONSE=$(curl -s -X POST "$BASE_URL/refresh" \
    -H "Content-Type: application/json" \
    -d "{
      \"refreshToken\": \"$REFRESH_TOKEN\"
    }")
  
  echo "Response:"
  echo "$REFRESH_RESPONSE" | jq '.' 2>/dev/null || echo "$REFRESH_RESPONSE"
  echo ""
else
  echo "❌ Failed to obtain access token. Skipping subsequent tests."
fi

echo "=========================================="
echo "Tests Complete"
echo "=========================================="
