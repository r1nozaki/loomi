#!/bin/bash

# Скрипт для тестування API Loomi
# Використання: ./test-api.sh

BASE_URL="http://localhost:8080"
EMAIL="test$(date +%s)@example.com"
PASSWORD="password123"

echo "🚀 Тестування API Loomi"
echo "======================"
echo ""

# Кольори для виводу
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функція для виводу успішного запиту
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Функція для виводу помилки
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Функція для виводу інформації
info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# 1. Реєстрація
echo "1️⃣  Реєстрація нового користувача..."
REGISTER_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

HTTP_CODE=$(echo "$REGISTER_RESPONSE" | tail -n1)
BODY=$(echo "$REGISTER_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 201 ] || [ "$HTTP_CODE" -eq 200 ]; then
    success "Реєстрація успішна (HTTP $HTTP_CODE)"
    TOKEN=$(echo "$BODY" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    if [ -z "$TOKEN" ]; then
        error "Не вдалося отримати token"
        exit 1
    fi
    info "Token: ${TOKEN:0:50}..."
else
    error "Реєстрація не вдалася (HTTP $HTTP_CODE)"
    echo "Відповідь: $BODY"
    exit 1
fi

echo ""

# 2. Створення профілю
echo "2️⃣  Створення профілю..."
PROFILE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Тестовий Користувач",
    "age": 25,
    "bio": "Це тестовий профіль для перевірки API",
    "imageUrl": "https://example.com/photo.jpg",
    "telegram": "@test_user",
    "interests": ["технології", "спорт", "музика", "читання"]
  }')

HTTP_CODE=$(echo "$PROFILE_RESPONSE" | tail -n1)
BODY=$(echo "$PROFILE_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 201 ] || [ "$HTTP_CODE" -eq 200 ]; then
    success "Профіль створено (HTTP $HTTP_CODE)"
    PROFILE_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | cut -d':' -f2)
    info "Profile ID: $PROFILE_ID"
else
    error "Створення профілю не вдалося (HTTP $HTTP_CODE)"
    echo "Відповідь: $BODY"
fi

echo ""

# 3. Отримання профілю
echo "3️⃣  Отримання свого профілю..."
PROFILE_ME_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/api/profile/me" \
  -H "Authorization: Bearer $TOKEN")

HTTP_CODE=$(echo "$PROFILE_ME_RESPONSE" | tail -n1)
BODY=$(echo "$PROFILE_ME_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    success "Профіль отримано (HTTP $HTTP_CODE)"
    echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
else
    error "Не вдалося отримати профіль (HTTP $HTTP_CODE)"
    echo "Відповідь: $BODY"
fi

echo ""

# 4. Отримання рекомендацій
echo "4️⃣  Отримання рекомендацій..."
RECS_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/api/recommendations?limit=5" \
  -H "Authorization: Bearer $TOKEN")

HTTP_CODE=$(echo "$RECS_RESPONSE" | tail -n1)
BODY=$(echo "$RECS_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    success "Рекомендації отримано (HTTP $HTTP_CODE)"
    RECS_COUNT=$(echo "$BODY" | grep -o '"id"' | wc -l | tr -d ' ')
    info "Знайдено рекомендацій: $RECS_COUNT"
    if [ "$RECS_COUNT" -gt 0 ]; then
        echo "$BODY" | python3 -m json.tool 2>/dev/null | head -30 || echo "$BODY" | head -30
    fi
else
    error "Не вдалося отримати рекомендації (HTTP $HTTP_CODE)"
    echo "Відповідь: $BODY"
fi

echo ""

# 5. Отримання матчів
echo "5️⃣  Отримання матчів..."
MATCHES_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/api/matches" \
  -H "Authorization: Bearer $TOKEN")

HTTP_CODE=$(echo "$MATCHES_RESPONSE" | tail -n1)
BODY=$(echo "$MATCHES_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    success "Матчі отримано (HTTP $HTTP_CODE)"
    MATCHES_COUNT=$(echo "$BODY" | grep -o '"id"' | wc -l | tr -d ' ')
    info "Знайдено матчів: $MATCHES_COUNT"
    if [ "$MATCHES_COUNT" -gt 0 ]; then
        echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
    fi
else
    error "Не вдалося отримати матчі (HTTP $HTTP_CODE)"
    echo "Відповідь: $BODY"
fi

echo ""
echo "======================"
echo -e "${GREEN}✨ Тестування завершено!${NC}"
echo ""
echo "💡 Підказки:"
echo "   - Swagger UI: http://localhost:8080/swagger-ui/index.html"
echo "   - Email для тесту: $EMAIL"
echo "   - Token: ${TOKEN:0:50}..."
echo ""
echo "Для повторного тестування запустіть: ./test-api.sh"





