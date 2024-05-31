const Item = ({ children }) => (
    <div style={{ overflow: 'scroll', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' }}>
        {children}
    </div>
)

export default Item;