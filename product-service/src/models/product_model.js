import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String
    },
    is_deleted: {
      type: Boolean,
      default: false
    }
  },

  { timestamps: true }
)

export default mongoose.model('Products', ProductSchema)
