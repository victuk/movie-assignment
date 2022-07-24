import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  let [search, setSearch] = useState("");

  return (
    <div id={styles.parentDiv}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        <div>MyTestApp</div>
      </header>

      <section>
        <div>
          <ul>
            <li>
              Watch <span className={styles.showOnPhone}>something</span>
            </li>
            <li>
              <span className={styles.hideOnPhone}>something</span>
            </li>
            <li>incredible</li>
          </ul>
        </div>
      </section>
      <div className={styles.container}>
        <div className={styles.search}>
          <div>Search</div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {search.length < 1 ? (
        <NoSearchResult />
      ) : (
        <ShowSearchResult search={search} />
      )}
    </div>
  );
}

function ShowSearchResult(props) {
  let [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?s=${props.search}&apikey=f7c29d6`)
      .then((res) => {
        console.log(res.data.Search);
        var groupBy = function (xs, key) {
          return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        setMovie(groupBy(res.data.Search, "Type"));
      })
      .catch((e) => console.log(e));
  }, [props.search]);

  return (
    <main>
      {Object.keys(movie).map((category) => {
        return (
          <div>
            <div className={styles.movie}>
              <div className={styles.movieCategory}>{category}</div>
            </div>
            <div className={styles.movieGroup}>
              {movie[category].map((value) => {
                return (
                  <div className={styles.movieName}>
                    <span>{value.Title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}

function NoSearchResult() {
  return (
    <main className={styles.searchAMovie}>
      <Image src="/video-play.png" width="100px" height="100px" />
      Search a movie
    </main>
  );
}
