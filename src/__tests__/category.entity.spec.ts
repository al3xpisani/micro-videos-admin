import { Uuid } from '../@shared/domain/value-objects/uuid.vo';
import { Category } from '../category/domain/category.entity';

describe('Category Unit Tests', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate');
  });
  it('should create a category with default values', () => {
    let category = new Category({ name: 'movie' });
    expect(category.name).toBe('movie');
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it('should create a category all values', () => {
    let category = new Category({
      name: 'movie',
      description: 'good movie',
      is_active: true,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.description).toBe('good movie');
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it('should create a new category with command', () => {
    const category = Category.create({
      name: 'movie',
    });

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a new category with description - command', () => {
    const category = Category.create({
      name: 'movie',
      description: 'good movie',
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('movie');
    expect(category.description).toBe('good movie');
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
  it('should create a new category with is_active false- command', () => {
    const category = Category.create({
      name: 'movie',
      description: 'good movie',
      is_active: false,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('movie');
    expect(category.description).toBe('good movie');
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBeInstanceOf(Date);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should change category name', () => {
    const category = Category.create({
      name: 'movie',
      description: 'good movie',
    });
    category.changeName('changed movie');
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('changed movie');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it('should change category description', () => {
    const category = Category.create({
      name: 'movie',
      description: 'good movie',
      is_active: false,
    });
    category.changeDescription('changed to a new description');
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.description).toBe('changed to a new description');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it('should deactivate category', () => {
    const category = Category.create({
      name: 'movie',
      description: 'good movie',
      is_active: true,
    });
    category.deactivate();

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.is_active).toBeFalsy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should activate category', () => {
    const category = Category.create({
      name: 'movie',
      description: 'good movie',
      is_active: false,
    });
    category.activate();

    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.is_active).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});

describe('category_id field', () => {
  const arrange = [
    { category_id: null },
    { category_id: undefined },
    { category_id: new Uuid() },
  ];
  test.each(arrange)('id = %j', ({ category_id }) => {
    const category = new Category({
      name: 'Movie',
      category_id: category_id as any,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
  });
});

describe('Category validator fields', () => {
  it('should validate if category name is empty', () => {
    expect(() => {
      Category.create({
        name: '',
      });
    }).toThrow('Entity Validation Error');
  });
  it('should validate if category name is null', () => {
    expect(() => {
      Category.create({
        name: null,
      });
    }).toThrow('Entity Validation Error');
  });
  it('should validate if category description can be optional', () => {
    const category = Category.create({
      name: 'movie',
      description: '',
    });
    expect(category.description).toBe('');
  });
});
