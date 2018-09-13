import Icon from "@material-ui/core/Icon";
import React from "react";

/**
 * Represents a card recieved from the Scryfall API
 */
export default class ScryfallCard {
    get symbolRegex() {
        return /({(.(\/.)?)})|\n/g;
    }

    /**
     * Returns a field from the front card of this transform card, or otherwise the normal card if this doesn't transform
     */
    frontField(field) {
        if ("card_faces" in this)
            return this.card_faces[0][field];
        else
            return this[field];
    }

    fieldAsComponent(field) {
        let regex = this.symbolRegex;

        // Remove all instances of its name from the rules text
        let str = this.frontField(field).replace(new RegExp(this.frontField('name'), 'g'), "~");

        // Sometimes legends have their name shortened
        if (this.frontField('name').includes(",")) {
            const firstName = this.frontField('name').split(",")[0];
            str = str.replace(firstName, "~");
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

            if (match[0][0] === "{") {
                // If this is an icon, add the image
                const symbol = match[2].toLowerCase();
                children.push(<img src={`/img/mana${symbol}.png`}/>);
            }
            else if (match[0] === "\n") {
                // If this is a linebreak, add that
                children.push(<br/>);
            }

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

