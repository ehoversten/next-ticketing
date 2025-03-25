'use client'

import { createClient } from "@supabase/supabase-js"
import { useState, useEffect } from 'react';

export default function DemoClientComponent() {
    const [user, setUser] = useState(null);

    async function getUser() {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if(error || !data) {
            console.log('No User')
        } else {
            setUser(data.user)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    console.log({ user })


    return (
        <div>
            <h2>Client Component</h2>

            { user ? (
                <h3>Hello {user}</h3>
            ) : null }
        </div>
    )
}