const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 11,
            opacity:0.3
        }}
    />
)

export default ColoredLine;