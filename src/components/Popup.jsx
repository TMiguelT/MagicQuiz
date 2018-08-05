import React from 'react';
import {observer} from 'mobx-react';

import {Modal, Level} from 'react-bulma-components/full';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

@observer
export default class IconPopup extends React.Component {

    render() {
        let icon;
        switch (this.props.icon) {
            case 'correct':
                icon = faCheck;
                break;
            case 'incorrect':
                icon = faTimes;
                break;
        }

        return (
            <Modal show={this.props.show} >
                <Modal.Content>
                    <Level>
                        <Level.Item>
                            <FontAwesomeIcon size='10x' icon={icon}/>
                        </Level.Item>
                    </Level>
                </Modal.Content>
            </Modal>
        );
    }
}
