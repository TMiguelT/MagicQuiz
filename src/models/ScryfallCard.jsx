import Icon from '@material-ui/core/Icon';
import React from 'react';

/**
 * Represents a card recieved from the Scryfall API
 */
export default class ScryfallCard {
    get symbolRegex() {
        return /{(.(\/.)?)}/g;
    }

    fieldAsComponent(field) {
        let regex = this.symbolRegex;
        
        // Remove its name from the rules text
        let str = this[field].replace(this.name, '~');
        
        // Sometimes legends have their name shortened
        if (this.name.includes(',')) {
            const firstName = this.name.split(' ')[0];
            str = str.replace(firstName, '~');
        }

        // Build up the children of a div
        const children = [];
        // Keep track of where we are in the text
        let position = 0;
        // The current match
        let match;

        // Read the symbols one by one
        while ((match = regex.exec(str)) !== null) {
            const matchText = match[0];
            const index = match.index;

            // If we skipped some text, add that to the children
            if (index > position) {
                children.push(str.slice(position, index));
            }

            // Add the icon itself
            const symbol = match[1].toLowerCase();
            children.push(<img src={`/dist/img/mana${symbol}.png`}/>);

            // Update the last position to just after this symbol
            position = index + matchText.length;
        }
        
        // Add the final text
        children.push(str.slice(position, -1));


        return <div>
            {children.map(x => x)}
        </div>;
    }
}

