# GAE - Groupe Allanic Energie

Web Application for Groupe Allanic Energie.

## About

This is a Laravel-based web application with Blade templates for Groupe Allanic Energie.

## Requirements

- PHP >= 8.2
- Composer
- Node.js & NPM (for frontend assets)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd GAE
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Set up the database:
```bash
php artisan migrate
```

6. Install frontend dependencies (optional):
```bash
npm install
npm run build
```

## Development

To start the development server:
```bash
php artisan serve
```

Then visit `http://localhost:8000` in your browser.

## Testing

Run tests with:
```bash
php artisan test
```

## Built With

- [Laravel](https://laravel.com) - The PHP framework for web artisans
- [Blade](https://laravel.com/docs/blade) - Laravel's templating engine

## License

This project is licensed under the MIT License.
