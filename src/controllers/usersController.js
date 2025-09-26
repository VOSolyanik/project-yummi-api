import { User, Recipe, Category, Area, Ingredient, Favorite } from '../db/models/index.js';

const toInt = (v, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : d;
};

// GET /users/:id/recipes
export const getUserRecipes = async (req, res, next) => {
  try {
    const { id } = req.params;

    const limit = Math.min(toInt(req.query.limit, 12), 50);
    const page = Math.max(toInt(req.query.page, 1), 1);
    const offset = (page - 1) * limit;
    const sortBy = (req.query.sortBy || 'createdAt').toString();
    const sortDir = ((req.query.sortDir || 'desc').toString().toUpperCase() === 'ASC') ? 'ASC' : 'DESC';

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const order = [];
    switch (sortBy) {
      case 'title': order.push(['title', sortDir]); break;
      case 'time': order.push(['time', sortDir]); break;
      case 'createdAt':
      default: order.push(['createdAt', sortDir]); break;
    }

    const { count, rows } = await Recipe.findAndCountAll({
      where: { ownerId: id },
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: Area, as: 'area', attributes: ['id', 'name'] },
        {
          model: Ingredient,
          as: 'ingredients',
          through: { attributes: ['measure'], as: 'RecipeIngredient' },
          attributes: ['id', 'name'],
        },
      ],
      attributes: { exclude: ['ownerId', 'categoryId', 'areaId'] },
      order,
      limit,
      offset,
      distinct: true,
    });

    // Flatten measure on ingredients
    const items = rows.map(r => {
      const data = r.toJSON();
      if (data.ingredients) {
        data.ingredients = data.ingredients.map(i => ({
          id: i.id, name: i.name, measure: i.RecipeIngredient?.measure || ''
        }));
      }
      return data;
    });

    return res.status(200).json({
      items,
      totalCount: count,
      page,
      limit,
    });
  } catch (err) {
    next(err);
  }
};

// GET /users/:id/favorites
export const getUserFavoriteRecipes = async (req, res, next) => {
  try {
    const { id } = req.params;

    const limit = Math.min(toInt(req.query.limit, 12), 50);
    const page = Math.max(toInt(req.query.page, 1), 1);
    const offset = (page - 1) * limit;
    const sortBy = (req.query.sortBy || 'createdAt').toString();
    const sortDir = ((req.query.sortDir || 'desc').toString().toUpperCase() === 'ASC') ? 'ASC' : 'DESC';

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const order = [];
    switch (sortBy) {
      case 'title': order.push(['title', sortDir]); break;
      case 'time': order.push(['time', sortDir]); break;
      case 'createdAt':
      default: order.push(['createdAt', sortDir]); break;
    }

    const { count, rows } = await Recipe.findAndCountAll({
      include: [
        {
          model: User,
          as: 'usersWhoFavorited',
          attributes: [],
          through: { model: Favorite, attributes: [] },
          where: { id },
          required: true,
        },
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: Area, as: 'area', attributes: ['id', 'name'] },
        {
          model: Ingredient,
          as: 'ingredients',
          through: { attributes: ['measure'], as: 'RecipeIngredient' },
          attributes: ['id', 'name'],
        },
      ],
      attributes: { exclude: ['ownerId', 'categoryId', 'areaId'] },
      order,
      limit,
      offset,
      distinct: true,
    });

    const items = rows.map(r => {
      const data = r.toJSON();
      if (data.ingredients) {
        data.ingredients = data.ingredients.map(i => ({
          id: i.id, name: i.name, measure: i.RecipeIngredient?.measure || ''
        }));
      }
      return data;
    });

    return res.status(200).json({
      items,
      totalCount: count,
      page,
      limit,
    });
  } catch (err) {
    next(err);
  }
};