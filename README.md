# Tailwind Tints

This is a [Tailwind CSS](#https://tailwindcss.com) plugin for automatically generating shades and tints for your custom colors with [Tailwind CSS IntelliSense](#https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) from **50 to 950**.

![alt screen short](https://github.com/waseem-sajjad/tailwind-tints/blob/main/Screenshot.png?raw=true)

## Installation

Using npm:

```bash
npm install -D tailwind-tints
```

Using yarn:

```bash
yarn add -D tailwind-tints
```

Using pnpm:

```bash
pnpm add -D tailwind-tints
```

Using bun:

```bash
bun add -D tailwind-tints
```

## Usage Tailwindcss@v4.\*

1. Create a `tints.plugin.ts` file in your project.

```typescript
import tailwindTints from "tailwind-tints";

const tints = tailwindTints({
  primary: "#2a9d8f",
  secondary: "#e9c46a",
});

export default tints;
```

2. Open your `styles.css` file and import the plugin.

```css
@import "tailwindcss";
@plugin "../tints.plugin.ts";
```

## Usage Tailwindcss@v3.\*

1. Register the plugin on your `tailwind.config.ts` file.

```typescript
import tailwindTints from "tailwind-tints";
import type { Config } from "tailwindcss";

const tints = tailwindTints({
  primary: "#2a9d8f",
  secondary: "#e9c46a",
});

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tints],
};

export default config;
```

2. Open your component or page and write class.

```tsx
const Button = () => {
  return (
    <button className="bg-primary hover:bg-primary-600 active:bg-primary-800">
      Button
    </button>
  );
};

export default Button;
```
