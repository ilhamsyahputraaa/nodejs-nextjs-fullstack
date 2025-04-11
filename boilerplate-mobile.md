💼 Mobile Development Project Challenge: TaskTrack - Team Task Management App
🧩 Deskripsi Proyek
Buatlah aplikasi mobile TaskTrack, yaitu aplikasi manajemen tugas untuk tim kecil (startup/komunitas), di mana user dapat:

Membuat dan mengelola proyek

Menambahkan tugas ke dalam proyek

Mengatur status tugas (To Do, In Progress, Done)

Berbagi proyek ke user lain via email

Melihat dashboard ringkasan proyek

🎯 Fitur Utama yang Harus Dibuat
1. Authentication (Firebase atau Backend sendiri)
Login / Register

Validasi email (via email link atau kode OTP)

2. Project Management
Buat, edit, hapus proyek

Tambahkan anggota tim ke proyek via email

Lihat daftar proyek user

3. Task Management
CRUD tugas di dalam proyek

Filter tugas berdasarkan status

Assign tugas ke anggota proyek

4. Dashboard
Progress bar berdasarkan status tugas

Total tugas, total selesai, total user aktif

5. Real-time Update (bonus)
Gunakan Firebase Realtime Database / Supabase / socket.io agar update tugas bisa langsung terlihat oleh semua anggota proyek secara real-time

✅ Kriteria Penilaian dan Best Practice yang Diharapkan
Area	Best Practice
Arsitektur Code	Gunakan arsitektur modular seperti MVVM atau Clean Architecture
State Management	Gunakan Provider, Riverpod, atau Bloc (Flutter) / Redux / Zustand / Context API (React Native)
UI/UX	Gunakan komponen reusable, clean design, dan smooth interaction
Networking	Abstraksi service layer, error handling, loading states
Folder Structure	Rapi, scalable, dan sesuai industry pattern
Testing (Bonus)	Unit test / widget test untuk fitur penting
Responsiveness	Layout responsif untuk berbagai ukuran layar
Performance	Optimisasi gambar, lazy loading, dan minimal re-render
💡 Tech Stack (Bebas dipilih)
Platform:

Flutter

React Native

Kotlin Multiplatform

Swift (Native)

Backend:

Firebase

Supabase

Express.js + PostgreSQL

NestJS

🕒 Deadline
5 hari pengerjaan. Wajib push ke GitHub dan sertakan link demo (APK/TestFlight/video screen record).




✅ Kenapa React Native cocok buat kamu:
Mirip banget dengan React / Next.js
JSX, state, props, hooks, bahkan cara pakai library seperti axios/zustand mirip.

Lebih cepat adaptasi
Kamu tinggal belajar sedikit tentang komponen mobile-nya: View, Text, ScrollView, FlatList, dll.

Ecosystem luas & banyak resource
Banyak contoh open source dan stack-nya fleksibel (support Expo & CLI Native).

Expo bikin hidup lebih gampang
Buat dev awal, cukup dengan expo, kamu bisa langsung jalanin app di HP kamu tanpa setup Xcode atau Android Studio full.

🚀 Langkah Awal Setup Frontend React Native
1. Install Expo CLI (cara tercepat dan termudah)
bash
Salin
Edit
npm install -g expo-cli
2. Buat Project
bash
Salin
Edit
npx create-expo-app tasktrack-mobile
cd tasktrack-mobile
npm start
3. Jalankan di HP
Install Expo Go app di HP kamu

Scan QR code dari terminal / browser

4. Struktur Folder Awal
bash
Salin
Edit
tasktrack-mobile/
│
├── assets/           # icon, gambar, font
├── components/       # reusable components
├── screens/          # semua page utama
├── services/         # API calls
├── stores/           # state management (zustand, etc)
├── navigation/       # react-navigation
└── App.js            # entry point
5. Install Dependency Penting
bash
Salin
Edit
npm install axios @react-navigation/native react-native-screens react-native-safe-area-context react-native-vector-icons
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view
npm install @react-navigation/native-stack
6. Contoh Fetch API
Misal kamu punya endpoint: GET /projects

ts
Salin
Edit
// services/api.ts
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // ganti ke IP LAN kamu kalau run di HP
})

export const getProjects = async () => {
  const res = await API.get('/projects')
  return res.data
}
tsx
Salin
Edit
// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { getProjects } from '../services/api'

export default function HomeScreen() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error)
  }, [])

  return (
    <View>
      <Text>Daftar Proyek</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  )
}
Kalau kamu mau, aku bisa bantu:

Setup full folder structure

Navigasi antar screen

Integrasi login

State management pakai Zustand atau Context

Mau langsung lanjut ke salah satu bagian itu?


====


🚀 STEP 1: Struktur Folder Project (Industry Standard)
Kita mulai dengan struktur project yang scalable dan rapi:

bash
Salin
Edit
tasktrack-mobile/
│
├── assets/                # Gambar, font, icon
├── components/            # Komponen reusable (Button, Card, etc)
├── constants/             # Constant global (warna, ukuran, dll)
├── navigation/            # Stack dan tab navigasi
├── screens/               # Semua page utama (Login, Home, etc)
├── services/              # API call (axios)
├── stores/                # Zustand store / Context
├── utils/                 # Helper function (format date, etc)
├── App.tsx                # Entry point
└── app.config.js          # Config Expo
🔁 STEP 2: Navigasi Antar Screen (react-navigation)
Install dulu:
bash
Salin
Edit
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
Setup file navigasi:
tsx
Salin
Edit
// navigation/index.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
🔑 STEP 3: Integrasi Login
Contoh dummy login pakai API-mu sendiri:

tsx
Salin
Edit
// screens/LoginScreen.tsx
import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { useAuthStore } from '../stores/auth'
import { login } from '../services/auth'

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useAuthStore(state => state.setUser)

  const handleLogin = async () => {
    try {
      const user = await login(email, password)
      setUser(user)
      navigation.replace('Home')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}
ts
Salin
Edit
// services/auth.ts
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://192.168.X.X:3000/api', // Ganti dengan IP LAN backend-mu
})

export const login = async (email: string, password: string) => {
  const res = await API.post('/auth/login', { email, password })
  return res.data.user
}
🧠 STEP 4: Zustand Store (untuk Auth misalnya)
bash
Salin
Edit
npm install zustand
ts
Salin
Edit
// stores/auth.ts
import { create } from 'zustand'

type User = {
  id: string
  email: string
}

type AuthStore = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
✨ STEP 5: Pasang di App.tsx
tsx
Salin
Edit
// App.tsx
import React from 'react'
import RootNavigation from './navigation'

export default function App() {
  return <RootNavigation />
}
Kalau kamu mau next step:

UI/UX-nya (misal pakai Tailwind via nativewind)

Integrasi ke real API backend-mu

Tambah screen (Project list, Task detail)

Simpan token login

Kabarin aja ya! Mau lanjut ke bagian mana dulu?