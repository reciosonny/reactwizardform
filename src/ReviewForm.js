import React, { Component } from 'react';
import ReviewFormStyle from './SharedComponents/ReviewFormStyle';
import FormEditModal from './FormEditModal';
import ContactForm from './ContactForm';
import AddressForm from './AddressForm';
import CommentForm from './CommentForm';


function mapForm(formData) {
    const { formProps } = formData;

    const result = Object.keys(formData).filter(propForm => propForm !== "formProps").map((x) => {
        const columnName = formProps.find(cFormProp => Object.keys(cFormProp)[0] === x)[x];

        return <ReviewFormStyle 
            label={columnName} 
            value={formData[x]} 
        />
    });

    return result;
}

class ReviewForm extends Component {

    constructor(props) {
        super(props);        
    }

    renderCommentForm = () => {
        const { commentForm } = this.props;
        const labels = ["Feedback Type", "Comment Box"];

        return Object.keys(commentForm).filter(x => x !== "selectionVal").map((prop, idx) => 
            <ReviewFormStyle label={labels[idx]} value={commentForm[prop]} />
        )
    }
    
    render() {
        const { contactForm, addressForm, commentForm } = this.props;
        const renderContactForm = mapForm(contactForm);
        const renderAddressForm = mapForm(addressForm);

        const editContactForm = <ContactForm onChange={this.props.onChangeContactForm} contact={contactForm} />
        const editAddressForm = <AddressForm onChange={this.props.onChangeAddressForm} address={addressForm} />
        const editCommentForm = <CommentForm onChange={this.props.onChangeCommentForm} comment={commentForm} />

        return (
            <div>
                <h3>Review form</h3>
                <br/><br/>

                <h4>Contacts</h4>
                <hr/>
                {renderContactForm}
                <FormEditModal editForm={editContactForm} />

                <h4>Address</h4>
                <hr/>
                {renderAddressForm}
                <FormEditModal editForm={editAddressForm} />


                <h4>Comments</h4>
                <hr/>
                {this.renderCommentForm()}
                <FormEditModal editForm={editCommentForm} />

            </div>
        );
    }
}

export default ReviewForm;