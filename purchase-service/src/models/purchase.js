import mongoose from 'mongoose';

const purchasedSchema = new mongoose.Schema(
    {
        products: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const purchaseModel = mongoose.model('purchase', purchasedSchema);

export default purchaseModel;
