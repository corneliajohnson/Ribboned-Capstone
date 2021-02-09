import Logo from "../../img/RibbonedWordOnly.png";

export const Footer = () => (
  <div className="footer fixed-bottom p-3 bg-light">
    <div className="d-flex justify-content-around">
      <div className="col d-none d-lg-block">
        <p className="text-center font-weight-bold">Tools & Technologies</p>
        C# | .NET | React | Javascript | ReactStrap | Entity Framework |
        Firebase | Youtube API
      </div>
      <div className="col mt-4 text-center">
        <img alt="ribboned logo" src={Logo} />
      </div>
      <div className="col d-none d-lg-block">
        <p className="text-center font-weight-bold">Contact the Developer</p>
        <p>
          GitHub:{" "}
          <a className="" href="https://github.com/corneliajohnson">
            github.com/corneliajohnson
          </a>
          {"\n "}
          Linkedin:
          <a
            className=""
            href="https://www.linkedin.com/in/cornelia-johnson-cs/"
          >
            linkedin.com/in/cornelia-johnson-cs
          </a>
        </p>
      </div>
    </div>
  </div>
);
