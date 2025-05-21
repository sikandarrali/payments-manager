export const AddButtonWrapper = ({ children }) => {
    return (
        <div className={'fixed bottom-0 left-1/2 -translate-x-1/2 bg-background w-full flex justify-center border-t-primary border-2 max-w-lg mx-auto z-50'}>
            {children}
        </div>
    )
}