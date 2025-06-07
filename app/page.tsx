import Header from '../components/Header';

export default function Home() {
  return <div>
    <Header />
    <a href="/auth/login" className='text-black'>Login</a>
  </div>;
}
