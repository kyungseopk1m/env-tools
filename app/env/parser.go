package env

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/kyungseopk1m/env-tools/app/models"
)

// ParseEnvFile reads and parses a .env file
func ParseEnvFile(filePath string) ([]models.EnvVariable, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var variables []models.EnvVariable
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		var comment string
		var envKeyAndValue string
		if inx := strings.Index(line, "#"); inx != -1 {
			comment = strings.TrimSpace(line[inx+1:])
			envKeyAndValue = strings.TrimSpace(line[:inx])
		}

		if envKeyAndValue != "" {
			parts := strings.SplitN(envKeyAndValue, "=", 2)
			if len(parts) != 2 {
				continue
			}

			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])

			// Remove quotes if present
			value = strings.Trim(value, `"'`)

			variables = append(variables, models.EnvVariable{
				Type:  models.ENV,
				Key:   key,
				Value: value,
			})
		}

		if comment != "" {
			variables = append(variables, models.EnvVariable{
				Type:  models.COMMENT,
				Value: comment,
			})
		}
	}

	return variables, scanner.Err()
}

// WriteEnvFile saves environment variables to a file
func WriteEnvFile(filePath string, variables []models.EnvVariable) error {
	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := bufio.NewWriter(file)
	for _, v := range variables {
		if v.Type == models.ENV {
			_, err := fmt.Fprintf(writer, "%s=%s\n", v.Key, v.Value)
			if err != nil {
				return err
			}
		} else {
			_, err := fmt.Fprintf(writer, "#%s\n", v.Value)
			if err != nil {
				return err
			}
		}
	}

	return writer.Flush()
}
