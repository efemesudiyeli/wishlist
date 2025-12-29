import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #FFF9F0, #FFF5E6)' }}>
      <div 
        className="max-w-md w-full space-y-8 p-8 rounded-2xl shadow-2xl gift-card relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FFF9F0, #FFF5E6)',
          border: '3px solid #FFD93D'
        }}
      >
        <div className="absolute top-4 right-4 text-3xl">🎀</div>
        <div className="absolute top-4 left-4 text-3xl">✨</div>
        <div className="relative z-10">
          <h2 className="text-center text-4xl font-bold mb-2 flex items-center justify-center gap-3" style={{ color: '#FF6B9D' }}>
            <span className="text-5xl">🎁</span>
            <span>Create Account</span>
          </h2>
          <p className="mt-2 text-center text-base font-medium" style={{ color: '#8B6F47' }}>
            Sign up for your wishlist account ✨
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
