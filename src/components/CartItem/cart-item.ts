import { defineComponent } from 'vue'

interface Props {
    imageUrl: String
    title: String
    price: Number
    isFavorite: Boolean
    isAdded: Boolean
    onAdd: Function
    onFavorite: Function
}

export default defineComponent({
    props: {
        imageUrl: String,
        title: String,
        price: Number,
        isFavorite: Boolean,
        isAdded: Boolean,
        onAdd: Function,
        onFavorite: Function
    },
    setup(props: Props) {
        const alert1 = () => {
            alert('Hello')
        }

        return {
            alert1
        }
    }
})
