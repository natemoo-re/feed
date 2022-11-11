---
date: 2022-11-11T01:37:57Z
---

`ultrahtml@1.0.0` is here!

🥳 Parse XML-like documents (HTML + Components)

↩️ Simple content transformations

💎 JSX Runtime

🔍 Built-in `querySelector` impl

🧽 Sanitizer API

---

<Card href="https://github.com/natemoo-re/ultrahtml"/>

---

Did we really need another HTML parser? Probably not! But `ultrahtml` has some interesting features that I haven't seen elsewhere...

It simplifies AST transformations and queries with an extensible `transform` interface and a built-in `querySelector` implementation.

It can handle HTML, but it's loose enough to handle other HTML-like formats such as `.astro`, `.vue`, or `.svelte`. On principle, it doesn't throw on syntax it doesn't recognize.

It treats `<Components />` as valid nodes.

It's pretty tiny! The main entrypoint comes in under 2KB, which is a reasonable size for client-side usage.

It comes with an implementation of the [`Sanitizer` API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API).

It features with a custom `jsx-runtime` if you want to build a fancy static site generator or have other wild ideas.

---

I've been working on `ultrahtml` for a while, and I'm really pleased with how `v1.0.0` has come together.

It's tiny, it's fast, and it's a great way to transform/sanitize/query any markup.
