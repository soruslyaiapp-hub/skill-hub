# skillhub-cli

Search SkillHub and install AI skills from your terminal. No dependencies. Node 20+.

```bash
node packages/cli/bin/skillhub.mjs search token
node packages/cli/bin/skillhub.mjs info repomix
node packages/cli/bin/skillhub.mjs add repomix
```

`add` prints the install command and runs it only after you type `y`. Nothing runs when the input is not a terminal.

Set `SKILLHUB_API` to your site, for example `https://your-domain.com/api/skills.json`. The default is `http://localhost:3000/api/skills.json`.

After you publish it to npm, it also works as `npx skillhub-cli search token`.
