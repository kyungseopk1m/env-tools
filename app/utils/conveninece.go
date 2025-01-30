package utils

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io/fs"
	"path/filepath"
)

// 사용자 편의성을 늘리는 함수들을 모아놓은 패키지입니다.

// SelectFileDialog : 파일 선택 다이얼로그를 띄워 파일을 선택하게 합니다.
// 업데이트 알림 기능도 이곳에 구현

func SelectFileDialog(ctx context.Context) (string, error) {
	rootDirFilePath, err := runtime.OpenDirectoryDialog(ctx, runtime.OpenDialogOptions{
		Title: "Select a Directory",
	})

	if err != nil {
		return "", err
	}
	return rootDirFilePath, nil
}

func GetEnvFilesInDirectory(rootPath string) ([]string, error) {
	var envFiles []string

	err := filepath.Walk(rootPath, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && filepath.Ext(path) == ".env" {
			envFiles = append(envFiles, path)
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return envFiles, nil
}
