package ui

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

func StartApp() {
	myApp := app.New()
	myWindow := myApp.NewWindow("env-tools")

	label := widget.NewLabel("Welcome to env-tools!")
	openButton := widget.NewButton("Open .env File", func() {
		// TODO: Implement file open logic
	})

	content := container.NewVBox(label, openButton)
	myWindow.SetContent(content)

	myWindow.Resize(fyne.NewSize(400, 300))
	myWindow.ShowAndRun()
}
