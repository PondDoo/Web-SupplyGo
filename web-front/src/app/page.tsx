'use client';
import React,{useState} from "react";
//import { loginUser } from "@/service/api";
import { useRouter } from 'next/navigation';
import { loginUser } from "@/service/apis";
import { RegisterUser } from "@/service/apis";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { token, userId } = await loginUser(username, password);
      console.log("Login Success!", token, userId);
      router.push('/dashboard');
    } catch (error) {
    console.error("Login failed", error); // ✅ ปลอดภัยและใช้งานได้
  }
  };


  const handleRegister = async () => {
    try {
      await RegisterUser(username, password , email);
      router.push('/dashboard');
    } catch (error) {
      console.error("การสมัครไม่สำเร็จ, โปรดลองใหม่อีกครั้ง.", error);
    }
  };

  return (
    <div className="items-center p-4">
      <h1 className="text-xl font-bold mb-4">Pond</h1>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="name" className="text-gray-700 font-medium">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="password" className="text-gray-700 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="password" className="text-gray-700 font-medium">
          email
        </label>
        <input
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>



      <button
        onClick={handleRegister}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Register
      </button>
    </div>
  );
}
