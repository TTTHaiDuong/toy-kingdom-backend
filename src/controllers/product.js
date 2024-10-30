import productServices from '../services/product';

const create = async (req, res) => {
    const { attributes } = req.body;

    productServices.upsert(null, attributes, null, (err, product) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ product: product, message: 'Ok' });
    });
}

const findOne = async (req, res) => {
    const { id } = req.query;
    const { role } = req.tokenPayload || { role: 'any' };

    const exclude = (role !== 'owner' && role !== 'admin') && 'revenue';

    productServices.findOne(id, exclude, (err, product) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ product: product, message: 'Ok' })
    });
}

const findAll = async (req, res) => {
    const { filter, page, limit } = req.query;
    const { role } = req.tokenPayload || { role: 'any' };

    const conditions = filter && JSON.parse(filter);

    const exclude = (role !== 'owner' && role !== 'admin') && 'revenue';

    productServices.findAll(conditions, exclude, page, limit, (err, products) => {

        console.error(err);
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ products: products, message: 'Ok' })
    });
}

const update = async (req, res) => {
    const { id, attributes } = req.body;

    if (!id) return res.status(400).json({ message: 'Missing id' });

    productServices.upsert(id, attributes, null, (err, count) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ updatedRows: count, message: 'Ok' });
    });
}

const destroy = async (req, res) => {
    const { ids } = req.body;

    productServices.destroy(ids, (err, deleted) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ message: 'Ok' });
    });
}

export default {
    create: create,
    findAll: findAll,
    findOne: findOne,
    update: update,
    destroy: destroy
}