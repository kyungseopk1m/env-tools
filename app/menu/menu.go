package menu

// Item represents a menu item
type Item struct {
	Label    string
	Action   func()
	Submenu  []*Item
}

// Menu represents the application menu
type Menu struct {
	Items []*Item
} 