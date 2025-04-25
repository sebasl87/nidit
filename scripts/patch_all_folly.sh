#!/bin/bash

PATCH_PATH="ios/Pods/RCT-Folly/folly/char_traits_unsigned_char_patch.h"
FOLLY_DIR="ios/Pods/RCT-Folly/folly"

echo "🛠️ Aplicando parche a TODOS los .cpp de RCT-Folly..."

# 1. Crear archivo del parche si no existe
if [ ! -f "$PATCH_PATH" ]; then
  echo "✅ Creando parche en $PATCH_PATH"
  mkdir -p "$(dirname "$PATCH_PATH")"
  cat <<EOF > "$PATCH_PATH"
// Patch to fix std::char_traits<unsigned char> on Xcode 16+
#pragma once
#include <string>
namespace std {
  template<> struct char_traits<unsigned char> {
    using char_type = unsigned char;
    using int_type = int;
    static void assign(char_type& c1, const char_type& c2) { c1 = c2; }
    static bool eq(const char_type& c1, const char_type& c2) { return c1 == c2; }
    static bool lt(const char_type& c1, const char_type& c2) { return c1 < c2; }
    static int compare(const char_type* s1, const char_type* s2, size_t n) {
      for (size_t i = 0; i < n; ++i) {
        if (lt(s1[i], s2[i])) return -1;
        if (lt(s2[i], s1[i])) return 1;
      }
      return 0;
    }
    static size_t length(const char_type* s) {
      size_t i = 0;
      while (!eq(s[i], 0)) ++i;
      return i;
    }
    static const char_type* find(const char_type* s, size_t n, const char_type& a) {
      for (size_t i = 0; i < n; ++i) if (eq(s[i], a)) return s + i;
      return nullptr;
    }
    static char_type* move(char_type* s1, const char_type* s2, size_t n) {
      return (char_type*)memmove(s1, s2, n);
    }
    static char_type* copy(char_type* s1, const char_type* s2, size_t n) {
      return (char_type*)memcpy(s1, s2, n);
    }
    static char_type* assign(char_type* s, size_t n, char_type a) {
      return (char_type*)memset(s, a, n);
    }
    static int_type not_eof(int_type c) { return c != EOF ? c : 0; }
    static char_type to_char_type(int_type c) { return static_cast<char_type>(c); }
    static int_type to_int_type(char_type c) { return static_cast<int_type>(c); }
    static bool eq_int_type(int_type c1, int_type c2) { return c1 == c2; }
    static int_type eof() { return EOF; }
  };
}
EOF
else
  echo "🔁 Parche ya existe."
fi

# 2. Recorre todos los .cpp dentro de folly y aplica el parche si falta
find "$FOLLY_DIR" -type f -name "*.cpp" | while read -r file; do
  if grep -q 'char_traits_unsigned_char_patch.h' "$file"; then
    echo "✅ Ya está parchado: $(basename "$file")"
  else
    echo "🔧 Parcheando: $(basename "$file")"
    sed -i '' '1s;^;#include "folly/char_traits_unsigned_char_patch.h"\n;' "$file"
  fi
done

echo "✅ Parche completo para todos los .cpp de RCT-Folly."
