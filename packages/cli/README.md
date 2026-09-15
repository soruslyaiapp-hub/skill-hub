# skillhub-cli

Search SkillHub and install AI skills from your terminal. No dependencies. Node 20+.

```bash
node packages/cli/bin/skillhub.mjs search token
node packages/cli/bin/skillhub.mjs info repomix
node packages/cli/bin/skillhub.mjs add repomix
```

`add` prints the install command and runs it only after you type `y`. Nothing runs when the input is not a terminal.

The default data source is the live site, `https://skill-hub-teal.vercel.app/api/skills.json`. Set `SKILLHUB_API` to use another copy, for example `http://localhost:3000/api/skills.json` while you develop.

After you publish it to npm, it also works as `npx skillhub-cli search token`.
