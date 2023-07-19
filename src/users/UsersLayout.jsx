import { Routes, Route } from 'react-router-dom';

import { PaginatedItems, AddEdit } from './';

export { UsersLayout };

function UsersLayout() {
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route index element={<PaginatedItems />} />
                    <Route path="add" element={<AddEdit />} />
                    <Route path="edit/:id" element={<AddEdit />} />
                </Routes>
            </div>
        </div>
    );
}
