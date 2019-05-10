import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';

const modalStyle = {
    overlay: {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)',
        zIndex            : 1000
    },
    content: {
        top               : '50%',
        left              : '50%',
        right             : 'auto',
        bottom            : 'auto',
        marginRight       : '-50%',
        transform         : 'translate(-50%, -50%)',
        background        : 'rgba(0, 0, 0, 0.8)',
        width             : '100vw',
        height            : '100vh',
        display           : 'flex',
        justifyContent    : 'center',
        alignItems        : 'center',
        zIndex            : 1000
    }
};

class Product extends PureComponent {
    state = {
        modalIsOpen: false,
        thumbnail: "",
        modalImage: "",
        isPlaces: this.props.catName === 'Places'
    }

    componentDidMount() {
        import(`../assets/images/${this.props.thumbnail}`)
            .then(thumbnail =>
                this.setState({
                    thumbnail
                })
            ).catch(err => {
                console.log('Error importing thumbnail: ' + err)
            })

        import(`../assets/images/${this.props.previewImg}`)
            .then(modalImage =>
                this.setState({
                    modalImage
                })
            ).catch((err) => {
                console.log('Error importing modal image: ' + err)
            })
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }

    componentWillMount() {
        Modal.setAppElement('body')
    }

    render(){
        const {modalIsOpen, thumbnail, modalImage, isPlaces} = this.state;
        const {name, type, limited, available, size, price, desc, modalDesc, stocked} = this.props;

        const classes = classNames(
            'hvr-sink',
            {'placesBoxClass': isPlaces},
            {'productBoxClass': !isPlaces}
        );

        const thumbnailImage = thumbnail && isPlaces
            ? <div className='placesImgClass' style={{ backgroundImage: 'url(' + thumbnail.default + ')' }}/>
            : <img className='productImgClass' alt={name} src={thumbnail.default} />

        const title = parseInt(stocked)
            ? <h3>{name}</h3>
            : <h3>{name} - SÅLD</h3>;

        const modalName = name
            && <h2><a className="modalDesc" href="mailto:magdamargaretha@gmail.com?subject=Fri!%20Fri!%20Fri!&body=Innan%20du%20skriver%20vill%20jag%20bara%20säga%20hej.%20Hej">{name}</a></h2>

        return (
            <div>
                <div className={classes} onClick={this.openModal}>
                    {thumbnailImage}
                    {title}
                    {type && <p>{type}</p>}
                    {limited && <p>begränsad upplaga: {limited} ex</p>}
                    {available && <p>tillgängliga: {available} ex</p>}
                    {size && <p>{size} cm</p>}
                    {price && <p>{price} kr</p>}
                    {desc && <p>{desc}</p>}
                    {modalDesc && <p>{modalDesc}</p>}
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                    contentLabel="Modal"
                >
                    <div className="modal-box">
                        <div className="close" onClick={this.closeModal}>&times;</div>
                        <img src={modalImage.default}/>
                        {modalName}
                        {modalDesc && <h2>{modalDesc}</h2>}
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Product;
