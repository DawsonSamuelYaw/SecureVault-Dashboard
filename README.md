# SecureVault Dashboard

A file explorer UI for SecureVault Inc., an enterprise cloud storage platform built for law firms and financial institutions. Users can navigate nested folder structures, inspect file metadata, and manage their vault entirely from the keyboard.


## Links

- **Live Demo:** [securevault-filesystem.netlify.app](https://securevault-filesystem.netlify.app/)
- **Local Dev:** [localhost:5173](http://localhost:5173/)
- **Design File:** [Figma](https://www.figma.com/design/PXmJEJcTp2Fdlsdnpu88eF/Untitled?node-id=0-1&t=vlPmUvulrA1MsZxZ-1)


## Setup

```bash
git clone https://github.com/DawsonSamuelYaw/SecureVault-Dashboard.git
cd SecureVault-Dashboard/myVault
npm install
npm run dev
```

---

## Tech Stack

- **React** — component architecture and state management
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icon library
- **Vite** — dev server and build tool

No UI libraries. Every component was written from scratch.

---

## Project Structure

```
src/
├── components/
│   ├── data.json        — nested folder/file tree data
│   ├── header.jsx        — search bar, action buttons, user card
│   ├── sidebar.jsx       — left nav (My Vault, Shared, Recent, Trash, Security)
│   ├── fileExplorer.jsx  — recursive file tree with keyboard navigation
│   └── Properties.jsx    — file metadata panel (filename, type, size, path)
├── App.jsx               — root component, holds shared state
└── main.jsx
public/
└── logo_vault.png        - logo
```

---

## Features

### Recursive File Tree

The file tree is built around a component called `TreeNode` that renders itself. When it hits a folder that's open, it maps over the folder's children and renders a new `TreeNode` for each one, passing `depth + 1` so indentation increases automatically. Files have no children so the recursion stops naturally. Closed folders also stop it because their children never get rendered.

```jsx
{isFolder && isOpen && node.children?.map(child => (
  <TreeNode key={child.id} node={child} depth={depth + 1} ... />
))}
```

The `openMap` state lives in `FileExplorer` rather than inside each `TreeNode`. This matters because keyboard navigation needs to open and close folders from outside the node, something that would be impossible if each node managed its own state privately.

### Keyboard Navigation

The container div gets focused on mount via `useEffect`, so the keyboard is ready immediately without any clicks.

A helper called `getVisibleNodes` walks the tree and returns a flat array of only the nodes currently on screen, closed folder contents are excluded. Arrow navigation works by finding the current node's index in this array and moving to `index ± 1`.

| Key | Action |
|-----|--------|
| `↓` | Next visible node |
| `↑` | Previous visible node |
| `→` | Expand closed folder |
| `←` | Collapse open folder |
| `↵` | Toggle folder / select file |

### Search & Filter

The search input is in the Header. The search term is lifted to `App.jsx` and passed down to `FileExplorer`, standard React pattern for shared state.

Filtering uses a recursive helper called `nodeMatchesSearch`. It checks if a node's name contains the search term, then checks all descendants using `.some()`. This keeps parent folders visible as long as any child anywhere in the subtree matches — so files buried inside nested folders are always reachable.

When a search is active, matching folders open automatically. When cleared, the tree goes back to its previous state.

```js
function nodeMatchesSearch(node, term) {
  if (node.name.toLowerCase().includes(term.toLowerCase())) return true
  if (node.children?.length) {
    return node.children.some(child => nodeMatchesSearch(child, term))
  }
  return false
}
```

### Navigation Pages

The sidebar has two sections, **Navigation** (My Vault, Shared, Recent, Trash) and **Security** (Activity Log, Encryption). Clicking **My Vault** loads the file explorer. All other pages currently show an under construction screen.
