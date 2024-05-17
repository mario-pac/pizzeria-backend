package utils

import (
	"crypto/md5"
	"encoding/hex"
	"strconv"
)

func HashPassword(password string) string {
	hash := md5.Sum([]byte(password))

	md5Hash := hex.EncodeToString(hash[:])

	return md5Hash
}

func ConvertStringToInt(s string) int {
	i, err := strconv.Atoi(s)
	if err != nil {
		return 0
	}
	return i
}
