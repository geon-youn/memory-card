export default function Card({ name, handleClick, clicked }) {
    return (
        <div className={'card' + (clicked ? ' clicked' : '')} onClick={() => handleClick(name)}>
            <img src={'img/' + name + '.png'} alt={'image for ' + name} />
            <div className="name">[{name}]</div>
        </div>
    );
}
