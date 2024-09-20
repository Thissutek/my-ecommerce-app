import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Loggin in with', {email, password});
    }

    return(
        <div className='max-w-md mx-auto bg-white p-8 shadow-md rounded-lg my-20'>
            <h2 className='text-2xl font-semibold mb-4'>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email
                    </label>
                    <input 
                        type='email' 
                        id='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                        />
                </div>
            </form>

            <div className='mb-6'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                    Password
                </label>
                <input 
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>

            <button type='submit' className='w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700'>
                Log In
            </button>
        </div>
    )
}