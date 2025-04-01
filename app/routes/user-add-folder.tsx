

export default function UserAddFolder() {
    return (
        <React.Suspense fallback={<FoldersTableSkeleton />}>
            <Await resolve={folders}>
                {({ items, newCursor }) => <FoldersTable items={items} actionsComponent={Actions} />}
            </Await>
        </React.Suspense>
    )
}