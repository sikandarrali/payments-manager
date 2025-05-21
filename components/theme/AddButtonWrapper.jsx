export const AddButtonWrapper = ({ children }) => {
    return (
        <div className={'fixed bottom-14 right-14 max-w-fit z-50'}>
            <div className="shrink-0">{children}</div>
        </div>
    )
}