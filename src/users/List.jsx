import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { userActions } from '_store';

const itemsPerPage = 5;

export { PaginatedItems };

function List({ dataList, loading }) {

    const dispatch = useDispatch();
    return (
        <div>
            <h1>Users</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {dataList?.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => dispatch(userActions.delete(user.id))} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
}

function PaginatedItems() {
    const dispatch = useDispatch();
    const list = useSelector(x => x.users.list);
    const [itemOffset, setItemOffset] = useState(0);
    console.log(list)

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    // const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    if (list?.loading) {
        return (
            <div colSpan="4" className="text-center">
                <span className="spinner-border spinner-border-lg align-center"></span>
            </div>
        )
    }
    if (list?.value?.length > 0) {

        const items = [...list?.value];
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <List dataList={currentItems} />
                <div>
                <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    nextLabel="Next"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
                </div>
                
            </>
        );
    }


}

