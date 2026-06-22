
import { getUser } from '@/lib/core/session,';
import React from 'react';

const layout = async({children}) => {

    await getUser("buyer")
    return children
};

export default layout;