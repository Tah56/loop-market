import { getUser } from '@/lib/core/session,';
import React from 'react';

const layout = async({children}) => {

    await getUser("admin")
    return children
};

export default layout;