# Tailwind Tints

This is a [Tailwind CSS](#https://tailwindcss.com) plugin for automatically generating shades and tints for your custom colors with [Tailwind CSS IntelliSense](#https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) from **50 to 950**.

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

## Usage

1. Register the plugin on your `tailwind.config.ts` file.

```typescript
import tailwindTints from "tailwind-tints";
import type { Config } from "tailwindcss";

const tints = tailwindTints({
  primary: "#2a9d8f",
  secondary: "#e9c46a"
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

2. Open your compoent or page and write class.

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
