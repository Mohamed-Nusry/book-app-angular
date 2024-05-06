export class Book {
    id: number | null;
    title: string;
    author: string;
    user_id: number | null;

    constructor(book: Partial<Book> = {}){
        this.id = book?.id || null;
        this.title = book?.title || '';
        this.author = book?.author || '';
        this.user_id = book?.user_id || null;
    }
}