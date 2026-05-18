export const Footer = () => {
  return (
    <footer className="py-6 px-4 mt-auto bg-muted border-t">
      <div className="max-w-sm mx-auto text-center text-sm text-muted-foreground">
        {'Copyright © '}
        <a href="https://github.com/Enaell/LeJardinDesLangues" className="hover:underline">
          Le Jardin des Langues
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </div>
    </footer>
  );
};
