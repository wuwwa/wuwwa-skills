# macOS Agent VM

Saved 2026-11-07 from the user's workflow description. Platform: macOS.

The proposal is to run an agent's desktop tools inside a macOS guest VM, using Apple's Virtualization framework, while the user continues working on the host. Keep the agent and desktop-control process inside the guest; running the desktop CLI on the host would still target the host desktop.

1. Read Apple's current macOS VM documentation and confirm host/guest support. The linked sample targets Apple silicon. The broader desktop CLI also supports other platforms; this particular VM workflow is the macOS-only reference.
2. Create a separate guest account/workspace and install the desktop agent tooling inside it. Avoid host home-folder mounts, shared credentials or clipboard integration when the intent is to keep personal host material out of scope.
3. Verify from the guest that the agent sees guest applications/files, then test a harmless desktop action before assigning real work. A VM does not by itself constrain network access or deliberately shared resources.

The matching original social post was not supplied, and this specific VM setup was not run on the current Windows machine. No VM installation or personal-desktop permissions are changed by saving this note.

Sources: [Apple Virtualization sample](https://developer.apple.com/documentation/virtualization/running-macos-in-a-virtual-machine-on-apple-silicon), [agent-desktop](https://github.com/vercel-labs/agent-desktop). Verify the intended agent-desktop distribution before following its installation instructions.
