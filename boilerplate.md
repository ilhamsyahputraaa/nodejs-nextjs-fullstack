
---

## 💼 **Project Title**: TaskFlow Pro

**Deskripsi**: TaskFlow Pro adalah sistem manajemen tugas dan proyek untuk tim. User bisa membuat organisasi, invite anggota, buat project, assign task, dan lacak progres. Cocok untuk simulasi project seperti di startup atau perusahaan enterprise.

---

## 🧱 **Tech Stack**

### 🔧 Backend
- Node.js
- Express
- PostgreSQL (pakai Prisma ORM)
- Zod (validasi input)
- JWT (authentication)
- dotenv
- Helmet & CORS (security)
- ESLint + Prettier (code quality)
- tsconfig-paths (alias import)
- Middleware & service layer architecture

### 🧑‍💻 Frontend
- Next.js (App Router)
- TailwindCSS + shadcn/ui
- React Query (Tanstack Query)
- Zod + React Hook Form
- Axios (API calls)
- Zustand (jika butuh global state tambahan)
- ESLint + Prettier
- TypeScript strict mode
- Absolute imports

---

## 🧱 Struktur Folder (high-level)

```
taskflow-pro/
│
├── server/                  # Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── .env
│   └── tsconfig.json
│
├── web/                     # Frontend (Next.js)
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── utils/
│   └── tsconfig.json
│
├── docker-compose.yml       # optional (PostgreSQL)
└── README.md
```

---

## 🛠️ Step-by-Step Setup

### ✅ 1. Buat Backend Project
```bash
mkdir -p taskflow-pro/server && cd taskflow-pro/server
npm init -y
npm install express cors dotenv helmet zod jsonwebtoken bcrypt @prisma/client
npm install -D typescript ts-node-dev prisma @types/express @types/node tsconfig-paths
npx tsc --init
npx prisma init
```

### ✅ 2. Setup Folder Struktur + tsconfig
```bash
mkdir -p src/{controllers,routes,services,middlewares,utils}
```

Edit `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": "./src",
    "paths": {
      "@controllers/*": ["controllers/*"],
      "@routes/*": ["routes/*"],
      "@services/*": ["services/*"]
    }
  }
}
```

---

### ✅ 3. Prisma Setup
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String   @id @default(cuid())
  name          String?
  email         String   @unique
  emailVerified DateTime?
  password      String?
  image         String?
  accounts      Account[]
  sessions      Session[]
  organizations OrganizationMember[]
  tasks         Task[]   @relation("AssignedTasks")
}

model Organization {
  id      String                @id @default(cuid())
  name    String
  members OrganizationMember[]
  projects Project[]
}

model OrganizationMember {
  id             String   @id @default(cuid())
  user           User     @relation(fields: [userId], references: [id])
  userId         String
  organization   Organization @relation(fields: [organizationId], references: [id])
  organizationId String
  role           String // "ADMIN" | "MEMBER"
}

model Project {
  id             String   @id @default(cuid())
  name           String
  organization   Organization @relation(fields: [organizationId], references: [id])
  organizationId String
  tasks          Task[]
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String // TODO, IN_PROGRESS, DONE
  dueDate     DateTime?
  assignedTo  User?    @relation("AssignedTasks", fields: [assignedToId], references: [id])
  assignedToId String?
  project     Project  @relation(fields: [projectId], references: [id])
  projectId   String
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String? 
  access_token       String? 
  expires_at         Int?    
  token_type         String? 
  scope              String? 
  id_token           String? 
  session_state      String? 
  user               User    @relation(fields: [userId], references: [id])

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

```

Lalu:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### ✅ 4. Buat Server Express

`src/app.ts`
```ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoutes);

export default app;
```

`src/server.ts`
```ts
import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
```

---

### ✅ 5. Setup Frontend (Next.js)
```bash
cd ../
npx create-next-app@latest web --typescript --app --tailwind --eslint
cd web
npm install axios @tanstack/react-query zod react-hook-form
```

Set alias dan `tsconfig.json` agar rapih.

---

### ✅ 6. Best Practice Frontend:
- Gunakan folder `lib/axios.ts` untuk instance axios
- Setup folder `hooks/useUser.ts` dan `hooks/useAuth.ts`
- Gunakan React Query untuk semua API calls
- Validasi input pakai `zod` + `react-hook-form`

---

Kalau kamu oke dengan semua ini, kita bisa langsung **jalanin backend dari langkah pertama**, aku bisa temenin setup sampai live-ready. Mau langsung mulai dari `Step 1: Backend Init` atau ada yang ingin kamu tanya dulu?


==========================



Mantap banget, kamu udah rapi dan clean banget setup-nya! Kita langsung lanjut ke **Step Selanjutnya (Step 2: Modularizing Structure + Middleware Setup)** supaya kamu siap ke next fase kayak autentikasi lebih kompleks, error handler, dan fitur lain.

---

## ✅ Step 2: Struktur Modular + Middleware Setup

### 1. **Struktur Folder Ideal untuk Industri**
Agar scalable dan mudah maintenance:

```
/server
├── src
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── services
│   ├── utils
│   ├── types
│   └── index.ts
├── prisma
├── .env
├── tsconfig.json
└── package.json
```

### 2. **Buat Middleware Folder**

#### 🧩 `/middlewares/errorHandler.ts`

```ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
```

#### 🧩 `/middlewares/auth.ts` (Optional tapi penting nanti)
Untuk validasi JWT token di route-route protected:

```ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
```

---

### 3. **Integrasi Middleware di app.ts**

```ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);

// ⛔️ Pasang errorHandler di paling akhir
app.use(errorHandler);

export default app;
```

---

### 4. **Tambahkan Type Tambahan untuk Express Request (Optional, tapi keren)**

#### 🧩 `/types/express/index.d.ts`

```ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
```

Lalu di `tsconfig.json`, pastikan sudah include:
```json
"include": ["src", "types"]
```

---

Kalau ini semua udah beres, kita bisa langsung lanjut ke:

## 🔜 Step 3: Setup Service Layer + Protected Routes

Kalau kamu udah siap atau udah implement sampe sini, tinggal bilang aja "gas step 3" biar kita lanjut 😎




==================================



Oke, kita **gas ke Step 3: Service Layer + Protected Routes Setup** 🚀

---

## ✅ Step 3: Setup Service Layer + Protected Routes

Di step ini kita bakal:

1. Pisahkan logic ke `services/`
2. Buat route yang hanya bisa diakses user login
3. Pastikan clean separation antara controller ⇆ service ⇆ prisma

---

### 1. **Buat Service File untuk Auth**

🧩 `server/src/services/auth.service.ts`

```ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (email: string, password: string, name?: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "MEMBER",
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return { user, token };
};
```

---

### 2. **Refactor Controller ke Controller ↔️ Service**

🧩 `server/src/controllers/auth.controller.ts`

```ts
import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser(email, password, name);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
```

---

### 3. **Buat Protected Route untuk Testing**

🧩 `server/src/routes/user.routes.ts`

```ts
import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get("/me", verifyToken, (req: Request, res: Response) => {
  res.json({ message: "Authorized access", user: (req as any).user });
});

export default router;
```

Lalu tambahkan di `app.ts`:

```ts
import userRoutes from "./routes/user.routes";

app.use("/api/user", userRoutes);
```

---

### 4. **Testing Checklist**
- ✅ `POST /api/auth/register` → buat akun baru
- ✅ `POST /api/auth/login` → dapatkan JWT token
- ✅ `GET /api/user/me` → **akses dengan Bearer Token**, harus return info user

---

Kalau ini udah aman dan kamu udah berhasil hit endpoint-nya, kita bisa **lanjut ke Step 4: Project & Task Feature**, atau kamu bisa request modul lanjutan apa dulu (misal: refresh token, role access, dll).

Mau lanjut ke fitur Project & Task? Atau tambahin dulu security (rate limiter, refresh token, dsb)?