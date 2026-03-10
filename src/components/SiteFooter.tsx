const SiteFooter = () => {
  return (
    <footer className="py-10 bg-bone border-t border-border">
      <div className="container text-center">
        <p className="font-heading text-xl uppercase tracking-widest mb-2">Thrift 56</p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Thrift 56. All rights reserved. Found objects, transformed art.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
