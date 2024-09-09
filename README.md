# Blitzed

Blitzed er TIHLDE's nettside for drikkeleker!

For å starte:

### 1. Klon repoet

```bash
git clone git@github.com:TIHLDE/Blitzed.git
```

### 2. Installer pakker

```bash
pnpm i
```

### 3. Sett opp miljøvariabler

```bash
cp .env-example .env
```

### 3. Sett opp database

Pass på at Docker kjører på pc-en din

```
make db
```

Deretter kjør migreringer på den

```
npx prisma migrate dev
```

### 4. Kjør prosjektet

```
pnpm dev
```
