# skillcurio-cli

Search SkillCurio and install AI skills from your terminal. No dependencies. Node 20+.

```bash
node packages/cli/bin/skillcurio.mjs search token
node packages/cli/bin/skillcurio.mjs info repomix
node packages/cli/bin/skillcurio.mjs add repomix
```

`add` prints the install command and runs it only after you type `y`. Nothing runs when the input is not a terminal.

The default data source is the live site, `https://skillcurio.dev/api/skills.json`. Set `SKILLCURIO_API` to use another copy, for example `http://localhost:3000/api/skills.json` while you develop.

After you publish it to npm, it also works as `npx skillcurio-cli search token`.
