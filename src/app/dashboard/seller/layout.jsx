import { getUser } from '@/lib/core/session,';
import React from 'react';

const layout = async({children}) => {

    await getUser("seller")
    return children
};

export default layout;